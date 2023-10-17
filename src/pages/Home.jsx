import { useState, useEffect } from "react";
import axios from "axios";


const API = "https://rickandmortyapi.com/api/character";

function Home() {
  const [personagem, setPersonagem] = useState([]);
  const [nome, setNome] = useState("");

  const listarPersonagens = () => {
    axios.get(API).then(
      ({ data }) => {
        setPersonagem(data.results);
        console.log(data.results);
      },
      (err) => {
        alert("Erro!");
      }
    );
  };

  const buscarPersonagem = () => {
    axios.get(`${API}/?name=${nome}`).then(
      ({ data }) => {
        setPersonagem(data.results);
      },
      (err) => {
        alert("Personagem não encontrado");
      }
    );
  };

  const onChangeNome = ({ target }) => {
    setNome(target.value);
  };

  useEffect(() => {
    listarPersonagens();
    buscarPersonagem();
  }, []);

  return (
    <>
      <h1>Rick And Morty</h1>
      <div className="divListaPersonagens">
        <h2 className="titulo">Lista de Personagens</h2>
        <div className="divPesquisa">
        <input
        className="inputPesquisa"
          type="text"
          onChange={onChangeNome}
          placeholder="Rick Sanchez"
          value={nome}
        />
        <button className="buttonPesquisa" onClick={buscarPersonagem}>Pesquisar</button>
        </div>
        {personagem.map((personagem) => {
          return (
            <div className="cardPersonagens">
              <img className="imagem" src={personagem.image} />
              <div className="informacao">
                <h7>{personagem.name}</h7>
                <h7>{personagem.status}</h7>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
