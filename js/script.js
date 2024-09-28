const labels = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'];

const mathMarks = [75, 80, 82, 78, 85, 90];
const scienceMarks = [68, 75, 72, 70, 76, 88];
const englishMarks = [85, 87, 90, 88, 86, 92];

const ctx = document.getElementById('studentMarksChart').getContext('2d');
const studentMarksChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Math',
                data: mathMarks,
                borderColor: '#003566',
                backgroundColor: 'rgba(0, 53, 102, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: 'Science',
                data: scienceMarks,
                borderColor: '#ae2012',
                backgroundColor: 'rgba(174, 32, 18, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: 'English',
                data: englishMarks,
                borderColor: '#52b788',
                backgroundColor: 'rgba(82, 183, 136, 0.2)',
                borderWidth: 2,
                fill: true,
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Marks (out of 100)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tests/Assessments'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        return label;
                    }
                }
            }
        }
    }
});

// Example function to update marks dynamically
function updateStudentMarks(math, science, english, testIndex) {
    mathMarks[testIndex] = math;
    scienceMarks[testIndex] = science;
    englishMarks[testIndex] = english;
    studentMarksChart.update();
}