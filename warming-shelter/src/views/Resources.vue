<template>
    <Header />
    <Wrapper>

        <h1>Resources</h1>
        <h2>Custom software solution designed to enhance the operation of the HRDCs year-round homeless warming center in Bozeman, Montana.</h2>

        <h3>Purpose</h3>
        <p>Aims to assist front desk staff in managing incoming and outgoing guests efficiently. This software aims to minimize the learning curve and reduce the operation burden on front desk staff.</p>

        <h3>External Links</h3>
        
        <h4>* Code</h4>
        <a href="https://github.com/423s24/Group_3/tree/main/warming-shelter" class="button">Frontend</a> <br>
        <a href="https://github.com/423s24/Group_3/tree/main/warming-shelter-restapi" class="button">Backend</a> <br>
        
        <h4>* Documentation</h4>
        <a href="https://github.com/423s24/Group_3/blob/main/documentation/user-documentation.md" class="button">User Documentation</a> <br>
        <a href="https://github.com/423s24/Group_3/blob/main/documentation/developer-documentation.md" class="button">Developer Documentation</a> <br>

        <h4>* Scrum Artifacts</h4>
        <a href="https://miro.com/app/board/uXjVNwgTvPg=/" class="button">Sprint Backlog</a> <br>
        <a href="https://docs.google.com/spreadsheets/d/1G-hcGIVEK-EKRsp6uCBdT0qUcOHVx9o86jCKsIm3S-U/edit#gid=2070898809" class="button">Burndown Chart</a> <br>
        <a href="https://www.figma.com/file/y9VvcpAj8Jtrc6drjBlYA7/HRDC-Dashboard?type=design&node-id=0-1&mode=design" class="button">User Interface Mockup</a> <br>
        <a href="https://github.com/423s24/Group_3/blob/main/Class_Diagram.png" class="button">Class Diagram</a>

    </Wrapper>

</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'

export default {
    components: {
      Header,
      Wrapper,
    }
}
</script>

<style>
        body {
            font-family: 'Open Sans', sans-serif; 
            color: #0a7278;;
        }
        h1{
            font-size: 2em;
        }
        h2{
            color:#a1a750;
            border-bottom: 5px solid #003e52;
            padding-bottom: 10px; 
            font-size: 1.3em;
        }
        h3{
            color: #003e52;
            font-size: 1.1em;
            font-weight: bold;
        }
        .button {
            display: inline-block; 
            padding: 10px 20px; 
            margin: 5px;
            background-color: #a1a750; 
            color: white; 
            text-decoration: 
            none; border-radius: 5px;
        }
        .button:hover{
            background-color: darkgrey;
            color: #0a7278
        }
</style>

