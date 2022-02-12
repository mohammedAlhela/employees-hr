<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Expense;

use App\Models\Permission;


use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         // User::factory(10)->create();
       //   Permission::factory(5)->create();
       //   $this->call([PermissionUserSeeder::class]);

        //  Employee::factory(400)->create();
         //  Expense::factory(400)->create();

        //  EmployeeDeductionBounsSalaryPayment::factory(200)->create();

        $this->call([CalcExpenseTotalSeeder::class]);
    }
}
