@extends('layouts.php')

@section('title')
    POLL
@endsection

@section('content')
    <style>

    </style>

    <div class="main-container" style="padding-top: 70px;">

    </div>

    <script type="text/javascript">
        var smallDisplay = false;
        var iframeLoaded = false;

        window.addEventListener("message", receiveMessage, false);
        function receiveMessage(event) {
            if (event.origin !== window.location.origin) {
                return;
            }

            if (event.data.loaded) {
                $('#loginIFrame').removeClass('hidden');
                $('#loginIFrameLoader').addClass('hidden');
            }

            if (event.data.success) {
                window.location.href = '/dashboard';
            }

        }

        // function onWindowLoad() {
        //     if (window.innerWidth <= 992) {
        //         smallDisplay = true;
        //     } else {
        //         loadLoginIFrame();
        //     }
        // }
        //
        // function loadLoginIFrame(timeoutDuration) {
        //     if(!timeoutDuration) {
        //         timeoutDuration = 0;
        //     }
        //     iframeLoaded = true;
        //     setTimeout(function() {
        //         var loginFrame = document.getElementById('loginIFrame');
        //
        //         loginFrame.src = '/user/login?embedded=true';
        //     }, timeoutDuration);
        // }
        //
        //
        // function toggleLoginView() {
        //     $('.home-segment .login-section').toggleClass('active');
        //     if (!iframeLoaded) {
        //         loadLoginIFrame(1000);
        //     }
        // }


    </script>
@endsection
