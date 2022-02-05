import React, { useState } from 'react';
import axios from 'axios';

import './Operacoes.css'

function Operacoes() {

  const baseUrlAPIOperacoesDivisores = "https://localhost:5001/api/operacoes/divisores";
  const baseUrlAPIOperacoesDP = "https://localhost:5001/api/operacoes/divisores/primos";  

  const [numero, setNumero ] = useState(0);
  const [errorNum, setErroNum ] = useState(false);
  const [divisores, setDivisores ] = useState([]);
  const [divisoresPrimos, setDivisoresPrimos ] = useState([]);

  const divisoresGet = async()=>{
    if(numero && numero > 0) {
      setErroNum(false);
      try {
        const resp = await axios.get(baseUrlAPIOperacoesDivisores, {
          params: {
            numero: numero,
            apiversion: '1.0'
          }
        });
        setDivisores(resp.data);
        console.log(resp.data);
      } catch(error) {
        console.log('Erro');
      }
    } else {
      setErroNum(true);
      setDivisores([]);
      setDivisoresPrimos([]);
    }
  }

  const divisoresPrimosGet = async() => {
    if(numero && numero > 0) {
      setErroNum(false);
      try {
        const resp = await axios.get(baseUrlAPIOperacoesDP, {
          params: {
            numero: numero,
            apiversion: '1.0'
          }
        });
        setDivisoresPrimos(resp.data);
      } catch(error) {
        console.log('Erro');
      }
    } else {
      setErroNum(true);
      setDivisores([]);
      setDivisoresPrimos([]);
    }
  }

  function changeNumero(numero) {
    setNumero(numero);

    setDivisores([]);
    setDivisoresPrimos([]);
  }



  return (
    <div className="container-app">
      <div className="container-header">
        <h1>Desafio Framework (.NET e React)</h1>
   
          <div className="container-form">
            <h4>Operações</h4>

            <div className="row justify-content-md-center">
              <div className="col align-self-center">
                <label htmlFor="numeroEntrada" className="form-label me-2">Número de Entrada: </label>
                <input id="numeroEntrada" type="text" className='mb-2' onBlur={(e) => changeNumero(e.target.value)}/>
              </div>
            </div>
        </div>
      </div>
        <div className="container-btn">
          <button className='btn btn-primary me-2 my-btn' onClick={ ()=> divisoresGet()}>Divisores </button><br/>
          <button className='btn btn-primary my-btn' onClick={ ()=> divisoresPrimosGet()}>Divisores Primos</button>
        </div>
 
        { divisores && divisores.length > 0 && (
          <div className="alert alert-success text-center m-4" role="alert">
            Divisores: 
              { divisores.map(operadores =>(
                `  ${operadores}, ` 
              ))}
          </div>
          )
        }

        {divisoresPrimos && divisoresPrimos.length > 0 && (
          <div className="alert alert-success text-center m-4" role="alert">
            Divisores Primos: 
              { divisoresPrimos.map(operadores =>(
                `  ${operadores}, `
              ))}
          </div>
        )}

        { errorNum &&
          <div className="alert alert-danger text-center m-4" role="alert">
            Não foi informado nenhum valor
        </div>
        } 

        <div className="container-rodape">
          <p className="fw-lighter text-center">Victor Hugo Oliveira Santos</p>
          <a href="https://www.linkedin.com/in/victor-santos-4b5a389a" target="_blank" className="text-decoration-none">LinkedIn</a>
        </div>
    </div>
    
  );
}

export default Operacoes;

