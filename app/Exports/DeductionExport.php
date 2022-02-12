<?php

namespace App\Exports;

namespace App\Exports;

use App\Models\EmployeeDeductionBounsSalaryPayment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class DeductionExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */

    protected $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function collection()
    {
        $deductions = EmployeeDeductionBounsSalaryPayment::where('employee_id', $this->id)->get();
        foreach ($deductions as $deduction) {
            $deduction->employee_id = $deduction->employee->first_name . ' ' . $deduction->employee->last_name;
        }
        return $deductions ;
    }

    public function headings(): array
    {
        return [
            'Addmission',
            'Date',
            'Details',
            'Notes',
            'Employee',
            'Deduction',
            'Bouns',
            'Salary Payments',
            'Total',
            'Created At',
            'Updated At',
        ];
    }

    // ...

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont('arial')->setSize(16);
            },

        ];
    }
}
