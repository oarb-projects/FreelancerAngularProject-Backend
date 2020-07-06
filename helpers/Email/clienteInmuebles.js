exports.htmlContent2=(emailContent)=>{
    const htmlContent2 = `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            :root {
                --main-bg-color: #0485B7;
                --main-contrast-color: #005F7C;
                --secondary-bg-color: #403d39;
                --secondary-contrast-color: #262421;
                --light-gray: #f7f7f7;
            }

            .img-container {
                position: relative;
            }

            .img-fluid {
                max-width: 100%;
                height: auto;
            }

            .logo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 55%;
            }

            .blue-line {
                border-color: #0485B7;
                border-width: 1rem;
                margin-block-start: -4px;
                margin-block-end: 0;
                border-style: solid;
            }

            .gray-line {
                border-color:#403d39;
                border-width: 0.25rem;
                margin-block-start: 0;
                margin-block-end: 0;
                border-style: solid;
                max-width: 7.5%;
            }

            main {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
            }

            .main-content {
                padding: 3rem;
            }

            .greeting {
                text-align: center;
                font-size: 2rem;
                margin: 0.5rem;
                font-weight: 500;
            }

            .name {
                text-align: center;
                margin: 0;
                font-size: 4rem;
                font-weight: 600;
            }

            .message {
                text-align: justify;
                font-size: 2rem;
                margin: 3rem;
                line-height: 3rem;
                font-weight: 500;
            }

            footer {
                font-family: 'Abel', sans-serif;
                text-align: center;
            }

            .footer-blue {
                background-color: #0485B7;
                padding: 1.5rem 0;
            }

            .footer-content {
                background-color: #403d39;
                font-size: 2rem;
                padding: 1.5rem;
            }

            .footer-content p {
                margin: 0;
                color: white;
            }
        </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet">
        <title>Correo</title>
    </head>

    <body>
        <div class="img-container">

            <img class="img-fluid" src="cid:logo" alt="fondo">
            <hr class="blue-line">
        </div>

        <main>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; box-shadow: 2px 2px 5px 1px black;" > 
                <tr style="border-bottom:2pt solid #470BA6;"> 
                    <td align="center" style="padding: 20px 0 20px 0;">	 
                        <img src="cid:logo" src="D:/Angular/correo/I82Logo.png" alt="Inmueble82" width="300" height="100" style="display: block;" /> 
                    </td>	 
                </tr>

                <tr> 
                    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"> 
                        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                            <tr>
                                <td style="font-family: 'Arial', sans-serif; font-size: 16px;"> 
                                    <b>Hola ${emailContent.name} </b>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 0 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"> 
                                    Para completar tu registro, por favor verifica tu correo.
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 30px 150px 30px 150px;">	
                                    <a href="${emailContent.query}" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #470BA6; padding: 15px 30px; border: 1px solid #470BA6; display: block;">VERIFICAR CORREO</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 0 2px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                    O copia este link y pega en tu navegador
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="${emailContent.query}" style="color: #0274D4;"><font color="#0274D4">${emailContent.query}</font></a>
                                    <!--<a href="http://www.Inmueble82.com/usuario/verificar_correo?correo=test&key=12345" style="color: #0274D4;"><font color="#0274D4">http://www.Inmueble82.com/usuario/verificar_correo?correo=test&key=1234</font></a>-->
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 30px 0 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                    Saludos,
                                </td>
                            </tr>
                            <tr>
                                <td style="font-family: 'Arial', sans-serif; font-size: 16px;">
                                    <b>Equipo Inmueble82</b>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#F5F5F5" style="padding: 20px 0 20px 0; color: #000000; font-family: 'Open Sans', sans-serif; font-size: 15px;">
                        <b>Mexicali, Baja California</b>
                    </td>
                </tr> 
            </table>
        </main>
    </body>
</html>
`
    return htmlContent2
}

