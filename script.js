document.addEventListener('DOMContentLoaded', () => {
    const marksForm = document.getElementById('marksForm');
    const resultSection = document.getElementById('resultSection');
    const displayInternal = document.getElementById('displayInternal');
    const requiredExternal = document.getElementById('requiredExternal');
    const minMarks = document.getElementById('minMarks');
    const resultMessage = document.getElementById('resultMessage');

    marksForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get internal marks
        const internalMarks = parseFloat(document.getElementById('internalMarks').value);
        
        // Validate input
        if (internalMarks < 0 || internalMarks > 60) {
            alert('Please enter internal marks between 0 and 60');
            return;
        }

        // Calculate required marks
        const totalPassingMarks = 50; // Total passing marks out of 100
        const internalContribution = internalMarks; // Internal marks are already out of 60
        const requiredExternalContribution = totalPassingMarks - internalContribution;
        
        // Convert required external contribution (out of 40) to marks out of 75
        // Formula: (required marks out of 40 / 40) * 75
        const requiredExternalMarks = (requiredExternalContribution / 40) * 75;
        
        // Display internal marks
        displayInternal.textContent = internalMarks.toFixed(2);
        
        // Show result message
        if (requiredExternalMarks <= 0) {
            resultMessage.textContent = "Congratulations! You've already secured enough marks to pass.";
            resultMessage.className = 'success';
            // Hide the required external marks section
            document.querySelector('.result-content p:nth-child(2)').style.display = 'none';
            document.querySelector('.result-content p:nth-child(3)').style.display = 'none';
        } else if (requiredExternalMarks > 75) {
            resultMessage.textContent = "⚠️ Warning: It's not possible to pass with the current internal marks. You need to improve your internal marks.";
            resultMessage.className = 'warning';
            // Hide the required external marks section
            document.querySelector('.result-content p:nth-child(2)').style.display = 'none';
            document.querySelector('.result-content p:nth-child(3)').style.display = 'none';
        } else {
            resultMessage.textContent = `You need to score at least ${requiredExternalMarks.toFixed(2)} marks out of 75 in the external exam to pass. This will be converted to ${requiredExternalContribution.toFixed(2)} marks out of 40.`;
            resultMessage.className = 'success';
            // Show the required external marks section
            document.querySelector('.result-content p:nth-child(2)').style.display = 'block';
            document.querySelector('.result-content p:nth-child(3)').style.display = 'block';
            requiredExternal.textContent = requiredExternalMarks.toFixed(2);
            minMarks.textContent = requiredExternalMarks.toFixed(2);
        }
        
        // Show result section
        resultSection.style.display = 'block';
    });
}); 