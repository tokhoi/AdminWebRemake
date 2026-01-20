    window.chartInstances = {};

window.initializeChart = function(canvasId, presentValue, absentValue) {
    try {
        const canvas = document.getElementById(canvasId);
        
        if (!canvas) {
            console.error(`Canvas element not found: ${canvasId}`);
            return;
        }

        // Destroy existing chart if it exists
        if (window.chartInstances[canvasId]) {
            try {
                window.chartInstances[canvasId].destroy();
                console.log(`Destroyed previous chart: ${canvasId}`);
            } catch (e) {
                console.warn(`Error destroying chart ${canvasId}:`, e);
            }
        }

        // Set canvas display size (CSS size)
        canvas.style.display = 'block';
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            console.error(`Failed to get 2D context for ${canvasId}`);
            return;
        }

        // Create new chart with explicit sizing
        window.chartInstances[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Có mặt', 'Vắng/Trễ'],
                datasets: [{
                    data: [presentValue, absentValue],
                    backgroundColor: ['#22c55e', '#ef4444'],
                    borderColor: ['#22c55e', '#ef4444'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: false
                }
            }
        });

        console.log(`Chart ${canvasId} created with data: present=${presentValue}, absent=${absentValue}`);
    } catch (error) {
        console.error(`Error initializing chart ${canvasId}:`, error);
        console.error(error.stack);
    }
};