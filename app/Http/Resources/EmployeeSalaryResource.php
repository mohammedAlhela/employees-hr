<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeSalaryResource extends JsonResource
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

        $days = array(
            'saturday',
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',

        );

        $key = array_rand($days);

        return [

            // 'id' => $this->id,

            // 'first_name' => $this->first_name,

            // 'last_name' => $this->last_name,

           // 'total_salary' => $this->total_salary,


            // 'health_number'  =>  $this->health_number,
             'based_at'  =>  $this->based_at,

        ];
    }
}
