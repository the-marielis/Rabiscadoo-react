import React from 'react';
import { SeletorDeHorario } from "./BotaoHora"

export const Calendario = ({ title }) => {

  return (
    <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '10px', 
            flexWrap: 'wrap',
            borderRadius: 20,
            border: '2px solid #8A2BE2',
            overflow: 'hidden',
        }}
    >
        <div 
            style={{
                backgroundColor: '#8A2BE2',
                padding: 10,
            }}
        >
            <h2 style={{textAlign: 'center', color: 'white'}}> {title} </h2>
        </div>
        <div style={{
            backgroundColor: 'white',
            padding: 20,
            
        }}>
            <SeletorDeHorario />
        </div>
    </div>
  );
}
