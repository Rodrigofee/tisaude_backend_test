<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class People extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    
    public $table = "peoples";

    protected $fillable = [
        'name',
        'taxpayer',
        'phone',
        'email',
        'birthday',
        'sex',
        'pregnant_woman',

        'street_name',
        'street_number',
        'city',
        'state',
        'zip',
        'active',
        'justification',
    ];
}
