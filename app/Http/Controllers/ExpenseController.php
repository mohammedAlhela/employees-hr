<?php

namespace App\Http\Controllers;

use App\Exports\ExpenseExport;
use App\Models\Expense;
use Excel;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function index()
    {
        $expenses = Expense::orderBy("created_at", "DESC")->get();

        $response = [

            'expenses' => $expenses,
        ];

        return response($response, 201);

    }

    // public function add(Request $request)
    // {







    //     Expense::create($request->all());

    //     $response = [
    //         'message' => 'Expense added successfully',
    //     ];

    //     return response($response, 201);
    // }


    public function update(Request $request, $id)
    {


        $expense = Expense::find($id);

        $input = $request->all();

        $expense->fill($input)->save();

        $response = [
            'message' => 'Expense updated successfully',
        ];

        return response($response, 201);

    }






    public function delete($id)
    {

        $expense = Expense::find($id);
        $expense->delete();

        $response = [
            'expense' => $expense,
        ];

        return response($response, 201);
    }

    public function exportExcel($id)
    {

        return Excel::download(new ExpenseExport($id), 'expenses.xlsx');

    }

}
