function showSection(sectionId) {
    const sections = document.querySelectorAll('.container');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

document.getElementById('cameraButton').addEventListener('click', () => {
    alert('Membuka kamera Raspberry Pi...');
});

document.getElementById('folderDropdown').addEventListener('change', (event) => {
    const selectedFolder = event.target.value;
    let folderLink = '';
    if (selectedFolder === 'valid') {
        folderLink = 'https://drive.google.com/drive/folders/1KVVgopOt8J_OekxxEuvYJ1RTKo_wg71J?usp=sharing';
    } else if (selectedFolder === 'train') {
        folderLink = 'https://drive.google.com/drive/folders/1XyWgsXZmgO3KcrzTCyyas7e7Pmm3qD4S?usp=drive_link';
    } else if (selectedFolder === 'pengujian') {
        folderLink = 'https://drive.google.com/drive/folders/1ewVTvFJCUK3E5TBn2b5Ap3Xjhub4I-VF?usp=drive_link';
    }
    alert(`Folder terpilih: ${selectedFolder}\nLink: ${folderLink}`);
});

function classifyImage() {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files[0]) {
        resultDiv.textContent = 'Please select a file first!';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://api.example.com/v1/kopiku/predict', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            resultDiv.textContent = `Error: ${error.message}`;
        });
}

function searchLog() {
    const date = document.getElementById('searchDate').value;
    const month = document.getElementById('searchMonth').value;
    const year = document.getElementById('searchYear').value;

    const logResult = document.getElementById('logResult');
    logResult.textContent = `Mencari log untuk: ${date}/${month}/${year}`;
}

function printLog() {
    const logResult = document.getElementById('logResult');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Log</title></head><body>');
    printWindow.document.write(`<pre>${logResult.textContent}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
