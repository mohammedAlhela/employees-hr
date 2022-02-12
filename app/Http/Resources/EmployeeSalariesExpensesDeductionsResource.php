<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeSalariesExpensesDeductionsResource extends JsonResource
{
    public function __construct($resource)
    {
        // Ensure we call the parent constructor
        parent::__construct($resource);
        $this->resource = $resource; // $apple param passed
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
$total_expenses = 100 ;
$total_salaryPayments = 300 ;



        return [

             'id' => $this->id,

             'first_name' => $this->first_name,

             'last_name' => $this->last_name,

             'basic_salary' => $this->basic_salary,

            //  'salary_accommodation' => $this->salary_accommodation,

            //  'salary_transportation' => $this->salary_transportation,

            //   'total_salary' => $this->total_salary,

            //   'total_expenses' => $total_expenses ,

            //   'total_salaryPayments' => $total_salaryPayments ,

            //   'based_at' => $this->based_at ,

            //   'position' => $this->position,

        ];
    }
}
