import styled from "styled-components";

export const Container = styled.div`
    .area-carregando {
       position: fixed;
       height: 100vh;
       width: 100vw;
       z-index: 100;
       background-color: #FFF;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
    }
    .area-cabecalho {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        .area-filtros {
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
                justify-content: center;
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
                height: 100px;
                width: 200px;
                border: 1px solid #DDD;
                border-radius: 5px;
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
        }
    }
    
`