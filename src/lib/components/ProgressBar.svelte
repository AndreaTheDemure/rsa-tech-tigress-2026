<script>
    export let progress = 0; // 0-100
</script>

<div class="progress-container">
    <div class="progress-bar" style="width: {progress}%"></div>
</div>

<style>
.progress-container {
    background: #eee;
    border-radius: 8px;
    width: 100%;
    height: 20px;
    overflow: hidden;
}
.progress-bar {
    background: #4caf50;
    height: 100%;
    transition: width 0.3s ease;
}
</style>