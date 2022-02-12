<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Image;

use DB;

class AccountController extends Controller
{
    public function login(Request $request)
    {

        $fields = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = user::where('username', $fields['username'])->first();
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'not matched credentials',
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        $permissions = $user->permissionsNames();
        $response = [
            'user' => $user,
            'token' => $token,
            'permissions' => $permissions,

        ];

        return response($response, 201);

    }

    public function me()
    {

        $user = auth()->user();
        $user_status = DB::table('users_status')->where('user_id', $user->id)->first();

        if (!$user_status->status || $user_status->deleted) {
            $response = [
                'message' => "User Deleted Or Updated From The Admin",
            ];

            return response($response, 401);
        } else {

            $user->password = '';

            // return image_name in case if image exist

            if ($user->image) {
                $image_name;
                $image_name = strchr($user->image, '_');
                $image_name = substr($image_name, 1);
                $user->image_name = $image_name;
            }

            $response = [
                'user' => $user,
                'tokens' => auth()->user()->tokens,
                'permissions' => $user->permissions,
                'permissionsNames' => $user->permissionsNames(),
            ];

            return response($response, 201);
        }

    }

    public function logout(Request $request)
    {

        $loggedOut = $request->user()->tokens()->delete();

        if ($loggedOut) {
            $response = [
                'message' => 'Logged out successfully',
            ];

            return response($response, 201);
        } else {
            $response = [
                'message' => 'Obs something went wrong in the server',
            ];

            return response($response, 401);
        }

    }

    public function update(Request $request)
    {

        $fields = $request->validate([
            'username' => 'required|min:3|max:30|unique:users,username,' . auth()->user()->id,
            'password' => 'nullable|min:3|max:30',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
        ]);

        $user = User::find(auth()->user()->id);

        $user->username = $request->username;

        if ($request->password != 'notAsssigned') {
            $user->password = Hash::make($request->password);
        }

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

        $response = [
            'user' => $user,
        ];

        return response($response, 201);

    }

}
