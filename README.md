# BibliotecaDev2

Repositório GIT que será utilizado para armazenar os commits sobre o projeto de Desenvolvimento de Sistemas 2 - IFRS

# Links Úteis

* Entrar no servidor do Discord que utilizaremos para teste:
* https://discord.gg/eHCqxvnV6c


# GitFlow
Para Efetuar uma task deve-se criar uma branch nova para ela e fazer toda a alteração nela.
Quando fechada uma sprint deve-se efetuar o merge de todas as branchs criadas para a master.
**Já mais efetuar um merge para a master estando uma branch quebrada.

# Comandos criados até o momento

## Comandos Básicos
* !obranova = Adiciona uma nova obra com valores default ao banco de dados;
* ?obrasautor = Pesquisa pelas obras baseado no autor do livro;
* ** Exemplo: ?obrasautor @nome_do_usuario
* ?pesquisar_obras = Trás como resultado todas as obras no banco de dados;
* ?deleteobrasautor = Deleta todas as obras do autor informado;
* ** Exemplo: ?deleteobrasautor @nome_do_usuario
* ?deleteautor = Deleta o autor em si. Não afeta as obras.

## Slash Commands
* /formulario_cadastro_autor = Cadastra um novo autor no banco;
* /formulario_cadastro_livro = Cadastra um novo livro no banco;
