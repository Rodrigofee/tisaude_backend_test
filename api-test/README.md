/*****************Realizção do teste de código*****************/

Passos para instação e atualização das dependências do projeto

1. npm install

Rodar a migration 

2. php artisan migrate

Adicionando ao arquivo composer.json linha para o arquivo funcões do helper

3. linha 29 do arquivo composer.json

"files": [
            "app/Http/Helpers/Functions.php"
        ]

Rodar instrução para criar rotas internas de arquilos

4. composer dump-autoload

Limpar cache

5. php artisan optimize