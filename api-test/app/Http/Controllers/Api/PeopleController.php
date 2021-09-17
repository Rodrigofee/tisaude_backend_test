<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\People;
use Carbon\Carbon;

class PeopleController extends Controller
{
    public function store(Request $request)
    {
        $people = People::where('taxpayer', cleanNumber($request->taxpayer))->get();
        if (empty($people)) {
            if (get_endereco(cleanNumber($request->zip)) == "Olinda") {

                $birthday = Carbon::parse($request->birthday)->format('Y-m-d');

                $request->merge(
                    [
                        'taxpayer' => cleanNumber($request->taxpayer),
                        'phone' => cleanNumber($request->phone),
                        'birthday' => $birthday,
                        'active' => 1
                    ]
                )->all();

                $request->validate(
                    [
                        'name' => 'required|max:100',
                        'taxpayer' => 'required|max:11',
                        'phone' => 'required|max:11',
                        'email' => 'required',
                        'birthday' => 'required',
                        'sex' => 'required',
                        'street_name' => 'required',
                        'street_number' => 'required',
                        'city' => 'required',
                        'state' => 'required',
                        'zip' => 'required|max:8',
                    ]
                );

                $people = People::create($request->all());

                if (years($birthday) <= 18 && $request->pregnant_woman == "") {
                    $text = "Grupo (Verde): prioridade baixa - código de cadastro: " . $people->id;
                } else if (years($birthday) < 65 && $request->pregnant_woman == "") {
                    $text = "Grupo (Amarela): prioridade média - código de cadastro: " . $people->id;
                } else {
                    $text = "Grupo (Vermelho): prioridade alta - código de cadastro: " . $people->id;
                }
                return response()->json(["text" => $text]);
            }
            return response()->json(["text" => "Usuario ja possue cadastro"]);
        }
        return response()->json(["text" => "Cidade nao permitida"]);
    }

    public function show($id)
    {
        $people = People::find($id);
        if ($people) {
            if ($people->active == 1) {

                $ret =
                    [
                        "name" => $people->name,
                        "taxpayer" => formatTaxpayer($people->taxpayer),
                        "phone" => formatPhone($people->phone),
                        "email" => $people->email,
                        "birthday" => Carbon::parse($people->birthday)->format('d-m-Y'),
                        "sex" => ($people->sex == "M") ? "Maculino" : "Feminino",
                        "street_name" => $people->street_name,
                        "street_number" => $people->street_number,
                        "city" => $people->city,
                        "state" => $people->state,
                        "zip" => $people->zip,
                    ];

                if (years($people->birthday) <= 18 && $people->pregnant_woman == "") {
                    $ret += ["group" => "Grupo (Verde): prioridade baixa"];
                } else if (years($people->birthday) < 65 && $people->pregnant_woman == "") {
                    $ret += ["group" => "Grupo (Amarela): prioridade média"];
                } else {
                    $ret += ["group" => "Grupo (Vermelha): prioridade alta"];
                }

                return response()->json($ret);
            }
        }

        return response()->json(["text" => "Cadastro invalido ou inexistente"]);
    }

    public function destroy(Request $request, $id)
    {
        $data =
            [
                "active" => 0,
                "justification" => $request->justification
            ];

        if (People::where('id', $id)->update($data)) {
            return response()->json(["text" => "Cancelado com sucesso!"]);
        }

        return response()->json(["text" => "Erro ao cancelar, tente novamente!"]);
    }
}
