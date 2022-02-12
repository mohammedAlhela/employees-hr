<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

use DateTimeInterface;


class User extends Authenticatable
{
    use HasFactory , HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $guarded = [];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        'updatd_at' => 'datetime:Y-m-d',
    ];

   // protected $dateFormat = 'U';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    protected function serializeDate(DateTimeInterface $date)
{
    return $date->format('Y-m-d');
}



    public function permissions(){
        return $this->belongsToMany(Permission::class , 'permission_user', 'user_id', 'permission_id');
    }

    public function permissionsNames(){
      return $this->permissions->pluck('name')->toArray();


    }

}
