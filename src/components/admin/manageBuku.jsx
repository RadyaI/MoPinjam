import styled from "styled-components";

export default function ManageBuku() {
  return (
    <>
      <Card>
        <Filter>
          <button>Create</button>
          <input type="text" placeholder="Cari buku..." />
          <select>
            <option value="terbaru">Terbaru</option>
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>
        </Filter>
        <TabelContainer></TabelContainer>
      </Card>
    </>
  );
}

const Card = styled.div`
  width:100p%;
  height:100%;
`;

const Filter = styled.div`
  // border:1px solid green; 
  width:100p%;
  height:20%;
  display:flex;
  justify-content:space-around;
  align-items:center;

  button{
    border:none;
    border-radius:50px;
    width:10%;
    height:60%;
    background-color:#222831;
    color:white;
    font-size:15px;
    cursor:pointer;
  }

  input{
    outline:none;
    border:none;
    border-radius:50px;
    background-color:#efefef;
    width:60%;
    height:60%;
    padding:0 20px;
    font-size:15px;
  }

  select{
    border:none;
    border-radius:50px;
    width:10%;
    height:60%;
    background-color:#222831;
    color:white;
    padding:0 10px;
    cursor:pointer;
    appearance:none;
    text-align:center;
    font-size:15px;
  }

  @media only screen and (max-width:700px){
    button{
      width:20%;
    }

    select{
      display:none;
    }
  }
`;

const TabelContainer = styled.div`
  width:100p%;
  height:80%;
  border:1px solid red;
`;
