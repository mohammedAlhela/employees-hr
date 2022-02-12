<?php

namespace App\Http\Controllers;

use App\Exports\DeductionExport;
use App\Models\EmployeeDeductionBounsSalaryPayment;
use Excel;
use Illuminate\Http\Request;

class DeductionController extends Controller
{

    public function index()
    {
        $deductions = EmployeeDeductionBounsSalaryPayment::orderBy("created_at", "DESC")->get();

        $response = [

            'deductions' => $deductions,
        ];

        return response($response, 201);

    }

    public function add(Request $request)
    {

        EmployeeDeductionBounsSalaryPayment::create($request->all());

        $response = [
            'message' => 'Record added successfully',
        ];

        return response($response, 201);
    }

    public function update(Request $request, $id)
    {

        $deduction = EmployeeDeductionBounsSalaryPayment::find($id);

        $deduction->employee_id = $request->employee_id;
        $deduction->date = $request->date;
        $deduction->details = $request->details;
        $deduction->notes = $request->notes;
        $deduction->deduction = $request->deduction;
        $deduction->salary_payments = $request->salary_payments;
        $deduction->bouns = $request->bouns;
        $deduction->total = $request->total;
        $deduction->save();

        $response = [
            'message' => 'Record updated successfully',
        ];

        return response($response, 201);

    }

    public function delete($id)
    {

        $deduction = EmployeeDeductionBounsSalaryPayment::find($id);
        $deduction->delete();

        $response = [
            'deduction' => $deduction,
        ];

        return response($response, 201);
    }

    public function exportExcel($id)
    {

        return Excel::download(new DeductionExport($id), 'deductions.xlsx');

    }

}
