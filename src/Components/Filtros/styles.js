import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    display: flex;
    .modal-filtros {
        top: 35px;
        position: absolute;
        height: 0px;
        width: 0px;
        overflow: hidden;
        background-color: #FFF;
        z-index: 4;
        transition: width 200ms, height 200ms;
        display: flex;
        flex-direction: column;

        .titulos-filtros {
            padding: 10px;
            font-weight: 500;
            font-size: 18px;
        }

        .tipos-filtros {
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;
            span {
                margin-left: 5px;
            }
            &:hover {
                background-color: #DDD;
            }
        }
    }    
    .modal-aberto {
        height: 600px;
        width: 300px;
        border: 1px solid #DDD;
        border-radius: 5px;
        overflow-y: auto;
    }    
    .filtro-selecionado {
        display: flex;
        align-items: center;
        margin-left: 20px;
        border-radius: 10px;
        padding: 2px 5px;
        span {
            margin-right: 5px;
        }
    }

`