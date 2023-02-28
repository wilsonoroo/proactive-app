import { useState } from "react";
import MaterialContainer from "../../MaterialContainer/MaterialContainer";
import * as Icons from 'react-feather';
import CustomTabs from "../../CustomTabs.js/CustomTabs";
import CustomButton from "../../CustomButton/CustomButton";
import GrupoUsuarios from "../../GrupoUsuarios/GrupoUsuarios";
import GrupoWhatsapp from "../../GrupoWhatsapp/GrupoWhatsapp";

export default function ListaMensajeria({usuarios}) {

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [itemSelected, setItemSelected] = useState(estados[0].hash);

  return (
    <div className='mt-3'>
      <div className='d-flex align-items-center my-3'>
        <CustomTabs items={estados} setItemSelected={setItemSelected} itemSelected={itemSelected} />
      </div>
      <MaterialContainer textoIzquierda="Lista de trabajadores que Deben Aceptar Oferta" >
        <div className="row row-cols-3">
          <div className="col my-2">
            <GrupoWhatsapp usuarios={usuarios} titulo="Mecanicos Pendientes" />
          </div>
        </div>
      </MaterialContainer>
    </div>
  );
}

const estados = [
  { nombre: "Pendientes", hash: "#pendientes" },
  { nombre: "Aceptaron", hash: "#aceptaron" },
]

const data = [
  {
    id: "123123",
    nombre: "Luciano Larama",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    progreso: 0.4,
    felicidad: true,
    documentos: [
      { nombre: "C. Identidad", estado: true },
      { nombre: "Prev. Salud", estado: true },
      { nombre: "Antecedentesawdad", estado: false },
      { nombre: "AFC", estado: true },
      { nombre: "Estudios", estado: true },
      { nombre: "AFP", estado: true },
      { nombre: "Contrato", estado: false },
      { nombre: "Finiquito", estado: false },
      { nombre: "Estudios", estado: true },
    ],
    licencias: [
      { nombre: "A1", estado: true },
      { nombre: "A2", estado: true },
      { nombre: "B", estado: false },
      { nombre: "D", estado: true },
      { nombre: "Interna MEL", estado: true },
      { nombre: "Interna CMZ", estado: true },
      { nombre: "Interna CMSG", estado: false },
      { nombre: "Interna Spence", estado: false },
    ],
    examenes: [
      { nombre: "Preocupacional", estado: true },
      { nombre: "Psico Riguroso", estado: false },
      { nombre: "3D", estado: false },
      { nombre: "Alcohol y Drogas", estado: false },
      { nombre: "Altura GEO", estado: false },
      { nombre: "PCR", estado: true },
    ],
    cursos_y_capacitaciones: [
      { nombre: "Hombre nuevo", estado: true },
      { nombre: "Manejo Extintos", estado: false },
      { nombre: "Espacion confinados", estado: true },
      { nombre: "Trabajos en Caliente", estado: false },
      { nombre: "Op puente Grúa", estado: false },
      { nombre: "Trabajo en altura", estado: true },
      { nombre: "Rigger", estado: true },
      { nombre: "Izaje cargas complejas", estado: true },
    ]
  },
  {
    id: "123123",
    nombre: "Luciano Larama",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    progreso: 0.4,
    felicidad: true,
    documentos: [
      { nombre: "C. Identidad", estado: true },
      { nombre: "Prev. Salud", estado: true },
      { nombre: "Antecedentesawdad", estado: false },
      { nombre: "AFC", estado: true },
      { nombre: "Estudios", estado: true },
      { nombre: "AFP", estado: true },
      { nombre: "Contrato", estado: false },
      { nombre: "Finiquito", estado: false },
      { nombre: "Estudios", estado: true },
    ],
    licencias: [
      { nombre: "A1", estado: true },
      { nombre: "A2", estado: true },
      { nombre: "B", estado: false },
      { nombre: "D", estado: true },
      { nombre: "Interna MEL", estado: true },
      { nombre: "Interna CMZ", estado: true },
      { nombre: "Interna CMSG", estado: false },
      { nombre: "Interna Spence", estado: false },
    ],
    examenes: [
      { nombre: "Preocupacional", estado: true },
      { nombre: "Psico Riguroso", estado: false },
      { nombre: "3D", estado: false },
      { nombre: "Alcohol y Drogas", estado: false },
      { nombre: "Altura GEO", estado: false },
      { nombre: "PCR", estado: true },
    ],
    cursos_y_capacitaciones: [
      { nombre: "Hombre nuevo", estado: true },
      { nombre: "Manejo Extintos", estado: false },
      { nombre: "Espacion confinados", estado: true },
      { nombre: "Trabajos en Caliente", estado: false },
      { nombre: "Op puente Grúa", estado: false },
      { nombre: "Trabajo en altura", estado: true },
      { nombre: "Rigger", estado: true },
      { nombre: "Izaje cargas complejas", estado: true },
    ]
  }
];

const ciudadItems = [{ nombre: "Calama", valor: "calama" }, { nombre: "Antofagasta", valor: "antofagasta" }, { nombre: "Santiago", valor: "santiago" }, { nombre: "La Serena", valor: "La Serena" }]