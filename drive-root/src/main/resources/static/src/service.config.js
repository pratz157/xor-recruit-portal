const baseURI = 'https://241e2d90-f6ff-4297-b9f4-8ab6d6fd1682.mock.pstmn.io';

const XorUrls = {

    login :{
        signin: baseURI +'/recruitmentassistant/login',
        signup: baseURI + 'recruitmentassistant/register'
    },
    drive:{
        create: baseURI +'/recruitmentassistant/drive',
        mapping: baseURI +'/recruitmentassistant/drive/assignCandidates'
    },
    schema :{
        panelist : {
            skills : baseURI + '/skillset',
            panel : baseURI +'/recruitmentassistant/admins'
        }
    },
    panel:{
        getCandiates:''
    },
    candidate:{
        candidateLogin:'https://jsonplaceholder.typicode.com/todos/1'
    }


}

export default XorUrls