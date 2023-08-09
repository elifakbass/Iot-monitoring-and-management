<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Dataset;


class Device extends Model
{
    use HasFactory;

    public function dashboards(){
      return $this->hasMany(Dashboard::class,'cihaz_id','id');
  }
  public function datasets(){
    $startOfDay = date('Y-m-d 00:00:00');
    $endOfDay = date('Y-m-d 23:59:59');
    return $this->hasMany(Dataset::class,'cihaz_id','id')->whereBetween('created_at', [$startOfDay, $endOfDay]);
  }

}
