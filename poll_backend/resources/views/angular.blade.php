@extends('layouts.base')

{{--@push('css')--}}
{{--    @yield('angular-styles', View::make('angular-styles'))--}}
{{--@endpush--}}

{{--@push('body_js')--}}
{{--    @yield('angular-scripts', View::make('angular-scripts'))--}}
{{--@endpush--}}

@section('title')
    Poll - the new Polling machine
@endsection

@section('body')
    <div class="pusher" style="height: 100%">
        bbbb
        <app-root style="height: 100%">
            <div style="display: flex; background: #f9f9f9; height: calc(100% - 8px); color: white; padding: 0 0 0 8px;"></div>
        </app-root>
    </div>
@endsection
