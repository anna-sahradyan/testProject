import styled from 'styled-components'


export const Wrapper = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.4)), url(/img/feshon.jpg);
    background-position: right;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;

`

export const AuthContainer = styled.div`
    margin: 100px;
    width: 500px;
    background-color: white;
    border-radius: 3%;
    filter: drop-shadow(3px 3px 10px #000052);
`
export const Form = styled.form`
    width: 80%;
    margin: 60px auto;
`