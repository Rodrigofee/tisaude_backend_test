<?php

function years($years)
{
    if ($years) {
        $data = new \DateTime($years);
        $result = $data->diff(new \DateTime(date('Y-m-d')));
        return $result->format('%Y');
    }
    return false;
}

function get_endereco($zip)
{
    $zip = preg_replace("/[^0-9]/", "", $zip);
    $url = "http://viacep.com.br/ws/$zip/xml/";

    $xml = simplexml_load_file($url);
    return $xml;
}

function formatTaxpayer($taxpayer)
{

    if (strlen($taxpayer) == 11) {

        return substr($taxpayer, 0, 3) . '.' . substr($taxpayer, 3, 3) . '.' . substr($taxpayer, 6, 3) . '-' . substr($taxpayer, 9);
    }

    return $taxpayer;
}

function formatPhone($phoneNumber)
{

    if (strlen($phoneNumber) === 10) {
        $phoneNumber = '(' . substr($phoneNumber, 0, 2) . ') ' . substr($phoneNumber, 2, 4)
            . '-' . substr($phoneNumber, 6);
    } else
    if (strlen($phoneNumber) === 11) {
        $phoneNumber = '(' . substr($phoneNumber, 0, 2) . ') ' . substr($phoneNumber, 2, 5)
            . '-' . substr($phoneNumber, 7);
    }

    return $phoneNumber;
}

function cleanNumber($number)
{
    $number = trim(str_replace(".", "", $number));
    $number = str_replace("_", "", $number);
    $number = str_replace("-", "", $number);
    $number = str_replace("(", "", $number);
    $number = str_replace(")", "", $number);
    $number = str_replace("/", "", $number);
    $number = str_replace(" ", "", $number);
    return $number;
}
