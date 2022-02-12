<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('authenticated/update', [AccountController::class, 'update']);
    Route::get('user', [AccountController::class, 'me']);
    Route::post('logout', [AccountController::class, 'logout']);
});

Route::post('login', [AccountController::class, 'login']);


    Route::get('users', [UserController::class, 'index']);
    Route::post('user/add', [UserController::class, 'add']);
    Route::post('user/update/{user}', [UserController::class, 'update']);
    Route::delete('user/{user}', [UserController::class, 'delete']);






    Route::post('employee/add', [EmployeeController::class, 'add']);
    Route::post('employee/update/{employee}', [EmployeeController::class, 'update']);
    Route::delete('employee/{employee}', [EmployeeController::class, 'delete']);



Route::get('employees', [EmployeeController::class, 'index']);


    Route::get('expenses', [ExpenseController::class, 'index']);

    Route::post('expense/update/{expense}', [ExpenseController::class, 'update']);







    Route::get('deductions', [DeductionController::class, 'index']);
    Route::post('deduction/add', [DeductionController::class, 'add']);
    Route::post('deduction/update/{deduction}', [DeductionController::class, 'update']);
    Route::delete('deduction/{deduction}', [DeductionController::class, 'delete']);



// datapages excel export
Route::get('deductions/exportExcel/{employee}', [DeductionController::class, 'exportExcel']);
Route::get('expenses/exportExcel/{employee}', [ExpenseController::class, 'exportExcel']);
Route::get('employees/exportExcel', [EmployeeController::class, 'exportExcel']);
Route::get('users/exportExcel', [UserController::class, 'exportExcel']);
// datapages excel export


Route::post('reports/pdf/employeeSalaries', [ReportController::class, 'pdfReport']);
Route::post('reports/excel/employeeSalaries', [ReportController::class, 'exportExcel']);
Route::get('reports/data', [ReportController::class, 'getPositionsEmployeesNumbers']);
