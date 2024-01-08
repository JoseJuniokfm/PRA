import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';

function Login() {
const [matricula, setMatricula] = useState('');
const [senha, setSenha] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleLogin = async () => {
    try {
      setError(''); // Limpa mensagens de erro antes de cada tentativa de login

      // Faz a chamada à sua API para realizar o login
      const response = await fetch('http://pra-integrado.azurewebsites.net/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: matricula,
          senha: senha,
        }),
      });

      if (!response.ok) {
        // Se a resposta não estiver ok, lança um erro com a mensagem do servidor
        const data = await response.json();
        throw new Error(data.message || 'Falha ao realizar o login');
      }

      const data = await response.json();

      // Aqui você pode fazer algo com o token retornado
      const token = data.token;
      console.log('Token JWT:', token);

      // Redireciona para a página Usuario.js após o login bem-sucedido
      navigate('/usuario');

      // Adicione a lógica adicional que desejar
    } catch (error) {
      // Trata o erro e define a mensagem de erro no estado
      setError(error.message || 'Matrícula ou Senha Inválida');
    }
  };

  return (
    <div className="col-lg-7 mb-5 mb-lg-0">
      <div className="card">
        <div className="text-center">
          <h1>Entre com seus dados</h1>
        </div>
        <div className="col-lg-5">
          <div className="card-body py-5 px-md-15">
          {error && <div className="alert alert-danger">{error}</div>}
            <form>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="matricula"
                  className="form-control"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
                <label className="form-label" htmlFor="matricula">
                  Matricula
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="senha"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <label className="form-label" htmlFor="senha">
                  Senha
                </label>
              </div>

              <div className="col">
                <a href="#!">Esqueceu senha</a>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block mb-4"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
