document.addEventListener("DOMContentLoaded", function () {
    const textBox = document.querySelector('.textbox'); // The input textbox
    const classifyButton = document.querySelector('.button-container .button');
    const resultTextBox = document.querySelectorAll('.textbox')[1]; // The second textbox for displaying results

    classifyButton.addEventListener('click', function () {
        const textData = textBox.value;

        const apiEndpoint = 'https://lr26qwqqso5cdoz2qrwe4575ke0ktiqp.lambda-url.ap-southeast-1.on.aws/';

        const data = {
            message: textData
        };

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);

            // Format the output to be displayed in the second textbox
            const formattedResult = `
                Summary: ${result.result.Summary}\nAllegedParty: ${result.result.AllegedParty}\nAccusation: ${result.result.Accusation}\nLocation: ${result.result.Location}\nAmount: ${result.result.Amount}
            `;

            // Set the formatted result into the second textbox
            resultTextBox.value = formattedResult.trim();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
