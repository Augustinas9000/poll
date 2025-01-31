@extends('layouts.base')

@push('css')
@endpush

@push('head_js')
@endpush

@section('body')
    @include('includes.header')
    @yield('content')
{{--    @include('includes.footer')--}}
@endsection
