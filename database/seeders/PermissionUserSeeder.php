<?php

namespace Database\Seeders;


use App\Models\User;

use App\Models\Permission;

use DB;



use Illuminate\Database\Seeder;

class PermissionUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = Permission::all();

        $users = User::all();



        // foreach ($permissions as $permission) {
        //     foreach ($users as $user) {
        //         DB::table('permission_user')->insert([
        //             'user_id' => $user->id,
        //             'permission_id' => $permission->id,
        //         ]);
        //     }
        // }

        foreach ($users as $user) {
            DB::table('users_status')->insert([
                'user_id' => $user->id,
            ]);
        }


    }


}
