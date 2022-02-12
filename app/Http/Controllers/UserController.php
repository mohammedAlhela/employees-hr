<?php

namespace App\Http\Controllers;

use App\Exports\UserExport;
use App\Models\Permission;
use App\Models\User;
use DB;
use Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Image;

class UserController extends Controller
{

    public function index()
    {

        // programming tags (whereBetween whereNotBetween )

        // mutli where in one row condition -----------------------
        // return DB::table('users')->where([
        //     ['username', 'mohammed alhelal'],

        //     ['image', '/images/users/1639750776_image.jpeg'],

        // ])->get();
        // mutli where in one row condition -----------------------

        // pass clouser function  -----------------------

        //   return DB::table('users')->where(
        //    function ($query) {
        //    $query->where([['username'  , 'mohammed alhelal'] , ['image'  , '/images/users/1639750776_image.jpeg']]);
        //    }
        //   )->get();

        // pass clouser function -----------------------

        // group by + order by the result + select some columns  -----------------------

        //   return DB::table('employees')->select(['nationality' , 'last_name' , DB::raw('count(last_name) AS employees_count')])->groupBy('nationality')->orderBy('employees_count' , "DESC")->get();

        // group by + order by the result + select some columns -------------------------

        // pluck + add key to block value (just like groupBy)   -----------------------
        // return DB::table('employees')->orderBy('nationality')->pluck('first_name' , 'nationality' )->all();
        // pluck + add key to block value -------------------------

        // pluck + add key to block value (just like groupBy)   -----------------------

        // pluck + add key to block value -------------------------

        $users = User::orderBy('created_at', 'DESC')->with(['tokens', 'permissions'])->get();

        foreach ($users as $user) {
            $user->permissionsNames = $user->permissionsNames();
        }

        $response = [
            'users' => $users,
            'permissions' => Permission::pluck('name')->all(),

        ];

        return response($response, 201);

    }

    public function add(Request $request)
    {

        $fields = $request->validate([
            'username' => 'unique:users,username|required|min:3|max:30',
            'password' => 'required|min:3|max:30|confirmed',
            'password_confirmation' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        ]);

        $user = new User;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        // update permissions section

        $permissions_names = array();
        $permissions_names = str_replace("[", "", $request->permissions);
        $permissions_names = str_replace("]", "", $permissions_names);
        $permissions_names = explode(",", $permissions_names);

        // update permissions section

        //  assign user image
        $image = request()->file('image');
        if ($image) {

            $imageName = $image->getClientOriginalName();
            $imageName = time() . '_' . $imageName;

            Image::make($image)->fit(600, 600)->save(public_path('/images/users/') . $imageName);
            $user->image = '/images/users/' . $imageName;

        }
        //  assign user image

        $user->save();

        if ($request->permissions) {
            $permissionsIds = Permission::whereIn('name', $permissions_names)->pluck('id');

            $user->permissions()->sync($permissionsIds);
        }

        DB::table('users_status')->insert([
            'user_id' => $user->id,
            'status' => 1,
            'deleted' => 0,
        ]);

        $response = [
            'user' => $user,
        ];

        return response($response, 201);
    }

    public function update(Request $request, $id)
    {

        $fields = $request->validate([
            'username' => 'required|min:3|max:30|unique:users,username,' . $id,
            'password' => 'nullable|min:3|max:30',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        ]);

        $user = user::find($id);
        $user->username = $request->username;
        if ($request->password != 'notAsssigned') {
            $user->password = Hash::make($request->password);
        }

        // update permissions section

        $permissions_names = array();
        $permissions_names = str_replace("[", "", $request->permissions);
        $permissions_names = str_replace("]", "", $permissions_names);
        $permissions_names = explode(",", $permissions_names);

        if ($request->permissions) {
            $permissionsIds = Permission::whereIn('name', $permissions_names)->pluck('id');

            $user->permissions()->sync($permissionsIds);
        }

        // update permissions section

        //  assign user image
        $image = request()->file('image');
        if ($image) {

            //  unlink the old image file
            if ($user->image) {
                unlink(substr($user->image, 1));
            }
            //  unlink the old image file

            $imageName = $image->getClientOriginalName();
            $imageName = time() . '_' . $imageName;

            Image::make($image)->fit(600, 600)->save(public_path('/images/users/') . $imageName);
            $user->image = '/images/users/' . $imageName;

        }
        //  assign user image

        $user->save();

        if ($request->permissions || $request->password || $request->username) {
            DB::table('users_status')->insert([
                'user_id' => $user->id,
                'status' => 1,
                'deleted' => 0,
            ]);
        }

        $response = [
            'user' => $user,
        ];

        return response($response, 201);

    }

    public function delete($id)
    {

        DB::table('users_status')->where('user_id', $id)->update([
            'user_id' => $id,
            'status' => 0,
            'deleted' => 1,
        ]);

        $user = DB::table('users')->with('tokens')->where('id', $id)->get();
        DB::table('permission_user')->where('user_id', $id)->delete();

        $imageSrc = $user->image;
        if ($imageSrc) {
            unlink(substr($imageSrc, 1));

            if (!file_exists(public_path() . $imageSrc)) {

                $user->delete();

            }

        } else {
            $user->delete();
        }

        $response = [
            'user' => $user,
        ];

        return response($response, 201);

    }

    public function exportExcel()
    {

        return Excel::download(new UserExport, 'users.xlsx');

    }

}
