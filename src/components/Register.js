import React, { useState } from 'react';

function Register() {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      setMensagem('Senhas não coincidem');
      setErro(true);
      return;
    }

    // Construir o objeto de dados do usuário
    const userData = {
      matricula,
      nome,
      senha,
      tipo,
    };

    try {
      // Fazer a requisição para a API
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        setMensagem('Registro realizado com sucesso!');
        setErro(false);
        // Redirecionar ou executar a lógica necessária após o registro
      } else {
        setMensagem('Falha ao registrar usuário');
        setErro(true);
        // Lógica para lidar com falha no registro
      }
    } catch (error) {
      setMensagem('Erro durante o registro');
      setErro(true);
      console.error('Erro durante o registro:', error);
      // Lógica para lidar com erros durante o registro
    }
  };

  return (
    <div className="container">
      <div className={`card ${erro ? 'border-danger' : 'border-success'}`}>
        <div className="card-body p-4 p-md-5">
          <h3 className={`mb-4 pb-2 ${erro ? 'text-danger' : 'text-success'}`}>
            {erro ? 'Erro!' : 'Sucesso!'}
          </h3>
          <p className={`mb-4 ${erro ? 'text-danger' : 'text-success'}`}>{mensagem}</p>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="matricula" className="form-label">
                Matrícula
              </label>
              <input
                type="text"
                className={`form-control ${erro && !matricula ? 'is-invalid' : ''}`}
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              {erro && !matricula && (
                <div className="invalid-feedback">Informe a matrícula</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="nome" className="form-label">
                Nome e Sobrenome
              </label>
              <input
                type="text"
                className={`form-control ${erro && !nome ? 'is-invalid' : ''}`}
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              {erro && !nome && <div className="invalid-feedback">Informe o nome</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className={`form-control ${erro && !senha ? 'is-invalid' : ''}`}
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {erro && !senha && (
                <div className="invalid-feedback">Informe a senha</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="csenha" className="form-label">
                Confirme Senha
              </label>
              <input
                type="password"
                className={`form-control ${erro && !confirmarSenha ? 'is-invalid' : ''}`}
                id="csenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {erro && !confirmarSenha && (
                <div className="invalid-feedback">Confirme a senha</div>
              )}
            </div>
            <div className="mb-4">
              <h6 className="mb-2 pb-1">Quem é você?</h6>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="aluno"
                  value="aluno"
                  onChange={() => setTipo('aluno')}
                />
                <label className="form-check-label" htmlFor="aluno">
                  Aluno
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="etep"
                  value="etep"
                  onChange={() => setTipo('etep')}
                />
                <label className="form-check-label" htmlFor="etep">
                  ETEP
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="seac"
                  value="seac"
                  onChange={() => setTipo('seac')}
                />
                <label className="form-check-label" htmlFor="seac">
                  SEAC
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="professor"
                  value="professor"
                  onChange={() => setTipo('professor')}
                />
                <label className="form-check-label" htmlFor="professor">
                  Professor
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
