import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import api from '../../services/api';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wpp, setWpp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();
  
  async function handleRegister(e){
    e.preventDefault();
    let numero = String(wpp.replace('(','').replace(')','').replace('-','').replace(' ',''))
   

    const data = {
      name,
      email,
      whatsapp: numero,
      city,
      uf
    }
    
    await api.post('/ongs', data).then(response => {
      alert(`Seu ID de acesso: ${response.data.id}. Guarde bem essa informação!`)
      history.push('/');
    }).catch(e => alert('Erro no cadastro, tente novamente.'))
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo be-the-hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontraremos casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já possuo cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required
          />
          <InputMask mask="(99) 99999-9999"
            placeholder="WhatsApp" 
            value={wpp} 
            onChange={e => setWpp(e.target.value)}
            required
          />

          <div className="input-group">
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={uf} 
              maxLength={2}
              onChange={e => setUf(e.target.value)} 
              required
            />
            <input 
              placeholder="Cidade" 
              value={city} 
              onChange={e => setCity(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  )
}