<!doctype html>
<html style="height: 100%;">
<head>
    <meta charset="utf-8">
    <title>@yield('title')</title>


    @hasSection('baseHref')
        <base href="@yield('baseHref')">
    @endif
    @sectionMissing('baseHref')
        <base href="/">
    @endif


    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-title" content="@yield('title')">
    <meta name="application-name" content="@yield('title')">
    <meta name="theme-color" content="#2467aa">

    @stack('css')
    @stack('head_js')
    @stack('head_script')

</head>
<body style="height: 100%; margin: 0">

@yield('body')

@stack('body_js')

</body>


</html>
