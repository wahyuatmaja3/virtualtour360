document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addSceneForm');
    const tableBody = document.getElementById('scenesTableBody');
    const messageBox = document.getElementById('messageBox');

    function showMessage(msg, type) {
        messageBox.textContent = msg;
        messageBox.className = `alert ${type}`;
        setTimeout(() => { messageBox.className = 'alert'; }, 5000);
    }

    function loadScenes() {
        fetch('/api/scenes')
            .then(res => res.json())
            .then(scenes => {
                tableBody.innerHTML = '';
                if(scenes.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="4">No scenes found. Add one above!</td></tr>';
                    return;
                }
                
                scenes.forEach(scene => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${scene.id}</td>
                        <td>${scene.title}</td>
                        <td>${scene.panorama}</td>
                        <td><button onclick="alert('Hotspot editor coming soon for ${scene.id}!')">Edit Hotspots</button></td>
                    `;
                    tableBody.appendChild(tr);
                });
            })
            .catch(err => console.error("Error loading scenes", err));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch('/api/scenes', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                showMessage(data.error, 'error');
            } else {
                showMessage('Scene added successfully!', 'success');
                form.reset();
                loadScenes(); // refresh table
            }
        })
        .catch(err => {
            showMessage('Error uploading scene', 'error');
            console.error(err);
        });
    });

    // Initial load
    loadScenes();
});
