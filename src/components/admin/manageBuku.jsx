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
        <TabelContainer>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 3</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-hapus">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </TabelContainer>
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
  width: 100%;
  height: 80%;
  overflow-y: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
  }

  th {
    background-color: #222831;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  .btn-edit{
    border:none;
    border-radius:5px 0 0 5px;
    padding:10px 15px;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }
  
  .btn-hapus{
    border:none;
    border-radius:0 5px 5px 0;
    padding:10px 15px;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }

  .btn-edit:hover, .btn-hapus:hover{
    background-color:#2b2f36;
  }
`;