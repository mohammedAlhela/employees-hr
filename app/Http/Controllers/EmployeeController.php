<?php

namespace App\Http\Controllers;

use App\Exports\EmployeeExport;
use App\Models\Employee;
use Excel;
use App\Models\Expense;
use DB;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{

    public function index()
    {
        $employees = Employee::orderBy("created_at", "DESC")->with(['expenses' , 'deductions'])->get();

        $response = [

            'employees' => $employees,
        ];

        return response($response, 201);

    }

    public function add(Request $request)
    {

        $fields = $request->validate([
            'first_name' => 'unique:employees,first_name|required|min:3|max:30',
            'last_name' => 'required|min:3|max:30',
            'employee_type' => 'required',
            'nationality' => 'required',

            'gender' => 'required',
            // 'date_of_birth' => 'required',

            // 'local_mobile_number' => 'required',
            // 'local_address' => 'required',

            // 'emergency_number' => 'required',
            // 'emergency_contact_name' => 'required',

            // 'passport_number' => 'required',
            // 'passport_expiry_date' => 'required',

            // 'residency_number' => 'required',
            // 'residency_expiry_date' => 'required',

            // 'health_number' => 'required',
            // 'health_renewal_date' => 'required',

            // 'labour_contract' => 'required',
            // 'labout_contract_issue_date' => 'required',

            // 'labour_contract_expiry_date' => 'required',
            // 'position' => 'required',

            // 'position_date_of_joining' => 'required',
            // 'position_branch_number' => 'required',

            // 'based_at' => 'required',

            // 'based_at_started_date' => 'required',
            // 'based_at_current_status' => 'required',

            'basic_salary' => 'required',
            'salary_transportation' => 'required',

            'salary_accommodation' => 'required',

            // 'date_of_leaving' => 'required',
            // 'reason_of_leaving' => 'required',

        ]);

        Employee::create($request->all());


        $employee_id = DB::table('employees')->latest('id')->first()->id;



        $expense = new Expense;
        $expense->employee_id = $employee_id;
        $expense->save();

        // $last_employee = Employee::latest()->first();

        // $last_employee->total_salary = "1000";

        // $last_employee ->save();

        $response = [
            'message' => 'Employee added successfully',
        ];

        return response($response, 201);
    }

    public function update(Request $request, $id)
    {

        $fields = $request->validate([
            'first_name' => 'required|min:3|max:30|unique:employees,first_name,' . $id,
            'last_name' => 'required|min:3|max:30',
            'employee_type' => 'required',
            'nationality' => 'required',

            'gender' => 'required',
            // 'date_of_birth' => 'required',

            // 'local_mobile_number' => 'required',
            // 'local_address' => 'required',

            // 'emergency_number' => 'required',
            // 'emergency_contact_name' => 'required',

            // 'passport_number' => 'required',
            // 'passport_expiry_date' => 'required',

            // 'residency_number' => 'required',
            // 'residency_expiry_date' => 'required',

            // 'health_number' => 'required',
            // 'health_renewal_date' => 'required',

            // 'labour_contract' => 'required',
            // 'labout_contract_issue_date' => 'required',

            // 'labour_contract_expiry_date' => 'required',
            // 'position' => 'required',

            // 'position_date_of_joining' => 'required',
            // 'position_branch_number' => 'required',

            // 'based_at' => 'required',

            // 'based_at_started_date' => 'required',
            // 'based_at_current_status' => 'required',

            'basic_salary' => 'required',
            'salary_transportation' => 'required',

            'salary_accommodation' => 'required',

            // 'date_of_leaving' => 'required',
            // 'reason_of_leaving' => 'required',

        ]);

        $employee = Employee::findOrFail($id);

        $input = $request->all();

        $employee->fill($input)->save();

        $response = [
            'message' => 'Employee updated successfully',
        ];

        return response($response, 201);

    }

    public function delete($id)
    {

        $employee = Employee::find($id);
        $employee->delete();

        $response = [
            'employee' => $employee,
        ];

        return response($response, 201);
    }

    public function exportExcel()
    {

        return Excel::download(new EmployeeExport, 'employees.xlsx');

    }

}
