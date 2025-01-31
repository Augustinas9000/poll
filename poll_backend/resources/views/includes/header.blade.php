@push('head_js')

@endpush

<style>
    .header-component {
        width: 100%;
        height: 80px;
        background: #dfe6ed;
        .header-inner-component {
            display: flex;
        }
    }
</style>

<div class="header-component">
    <div class="header-inner-component">
        <div></div>
        <div></div>
        <div>
            <iframe id="loginIFrame" class="hidden"></iframe>
        </div>
    </div>
</div>

<script>

    @if (true)
        window.onload = onWindowLoad;
    @endif

    function onWindowLoad() {

        loadLoginIFrame();

    }

    function loadLoginIFrame(timeoutDuration) {
        if(!timeoutDuration) {
            timeoutDuration = 0;
        }
        iframeLoaded = true;
        setTimeout(function() {
            var loginFrame = document.getElementById('loginIFrame');

            loginFrame.src = '/user/login?embedded=true';
        }, timeoutDuration);
    }

</script>

