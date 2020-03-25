import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

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
    const data = {
      name,
      email,
      whatsapp: wpp,
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
          />
          <input 
            placeholder="WhatsApp" 
            value={wpp} 
            onChange={e => setWpp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city} 
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={uf} 
              onChange={e => setUf(e.target.value)} 
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  )
}