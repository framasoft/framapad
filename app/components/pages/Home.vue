<template lang="html">
  <main id="classic">

    <div class="row">
        <div class="col-md-8">
            <div class="">
                <h2 class="sr-only">{{ $t('message.what.title') }}</h2>
                <p class="text-center"><img src="/img/screenshot-fr.png" alt="" class="ombre" /></p>
                <div class="caption">
                    <p>{{ $t('message.what.desc') }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4" id="howitworks">
            <h2 class="h3">{{ $t('message.how.title') }}</h2>
            <ul>
              <li v-html="$t('message.how.list[0]')"></li>
              <li v-html="$t('message.how.list[1]')"></li>
              <li v-html="$t('message.how.list[2]')"></li>
              <li v-html="$t('message.how.list[3]')"></li>
              <li v-html="$t('message.how.list[4]')"></li>
              <li v-html="$t('message.how.list[5]')"></li>
              <li v-html="$t('message.how.list[6]')"></li>
            </ul>
            <p v-html="$t('message.how.demo')"></p>
        </div>
    </div>

    <div class="row">

      <div class="col-md-6 col-md-offset-1 pad-options">
        <div class="well">
          <form class="form-horizontal" id="create-pad">
            <fieldset>
              <legend><i class="fa fa-fw fa-lg fa-globe"></i> {{ $t('message.public.title') }}</legend>
              <div class="form-group">
                <label for="classic-pad-name" class="col-sm-4 control-label">{{ $t('message.public.name') }}</label>
                <div class="col-sm-8">
                  <input type="text" id="classic-pad-name" class="form-control pad-name" value="" maxlength="50"  aria-describedby="#name-help"/>
                  <span id="name-help" class="help-block small">
                    <strong>
                      <i class="fa fa-lg fa-warning" aria-hidden="true"></i>
                      {{ $t('message.public.warning') }}
                    </strong><br>
                    {{ $t('message.public.samename') }}
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label for="expiration" class="col-sm-4 control-label"></label>
                <div class="col-sm-8">
                  <select id="expiration" aria-describedby="#expiration-help" class="form-control">
                    <option value="quotidien">{{ $t('message.public.day') }}</option>
                    <option value="hebdo">{{ $t('message.public.week') }}</option>
                    <option value="mensuel" selected>{{ $t('message.public.month') }}</option>
                    <option value="bimestriel">{{ $t('message.public.two-month') }}</option>
                    <option value="semestriel">{{ $t('message.public.six-month') }}</option>
                    <option value="annuel">{{ $t('message.public.year') }}</option>
                  </select>
                  <span id="expiration-help" class="help-block small" v-html="$t('message.public.help')"></span>
                </div>
              </div>
              <div class="text-center col-sm-12">
                <button class="btn btn-lg btn-primary pad-create" type="submit">
                  <i class="fa fa-fw fa-lg fa-align-left"></i> {{ $t('message.public.create') }} »
                </button>
                <a id="pad-url" href=".framapad.org/p/" class="hidden" rel="nofollow"></a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <div class="col-md-4 col-md-offset-1 mypads">
        <div class="well">
          <fieldset>
            <legend><i class="fa fa-fw fa-lg fa-key"></i> {{ $t('message.private.title') }}</legend>
            <p>{{ $t('message.private.desc') }}</p>
            <p class="text-center">
              <a href="https://mypads.framapad.org/mypads/?/login" class="btn btn-block btn-lg btn-primary"><i class="glyphicon glyphicon-lock"></i> {{ $t('message.private.signin') }}</a>
              <a href="https://mypads.framapad.org/mypads/?/subscribe" class="btn btn-block btn-lg btn-success"><i class="glyphicon glyphicon-user"></i> {{ $t('message.private.signup') }}</a>
            </p>
          </fieldset>
        </div>
      </div>

    </div>

    <hr role="presentation" />

    <div class="row">

      <div class="col-md-4" id="tuto-video">
        <h2>{{ $t('message.help.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-film"></i></p>
        <p>{{ $t('message.help.desc') }}</p>
        <p class="text-center"><a href="#TutoVideo" data-toggle="modal" class="btn btn-primary">{{ $t('message.help.play') }}</a></p>
      </div>

      <!-- modale vidéo -->
      <div class="modal fade" id="TutoVideo" tabindex="-1" role="dialog" aria-labelledby="TutoVideoLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">x</span><span class="sr-only">{{ $t('message.help.close') }}</span></button>
              <h1 id="TutoVideoLabel">{{ $t('message.help.title') }}</h1>
            </div>
            <div class="modal-body text-center">
              <iframe width="560" height="315" src="https://framatube.org/videos/embed/4ebf637e-83d1-4fd7-b255-2716cfd7447b" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal-footer"><a href="#" class="btn btn-default" data-dismiss="modal">{{ $t('message.help.close') }}</a></div>
          </div>
        </div>
      </div>
      <!-- /modale vidéo -->

      <div class="col-md-4" id="le-logiciel">
        <h2>{{ $t('message.software.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-cloud"></i></p>
        <p>{{ $t('message.software.basedon') }} <a href="http://etherpad.org">Etherpad</a>.</p>
        <p>{{ $t('message.software.itis') }}<a href="https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite">{{ $t('message.software.instances') }}</a>.</p>
        <p v-html="$t('message.software.license')"></p>
      </div>

      <div class="col-md-4" id="jardin">
        <h2>{{ $t('message.garden.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-tree-deciduous"></i></p>
        <p>{{ $t('message.garden.contrib') }} <a href="https://github.com/ether/etherpad-lite">{{ $t('message.garden.devsite') }}</a>.</p>
        <br>
        <p>{{ $t('message.garden.install') }}</p>
        <p class="text-center"><a :href="$t('message.garden.framacloud')" style="color:white" class="btn btn-success"><i class="glyphicon glyphicon-tree-deciduous"></i> framacloud.org</a></p>
      </div>
    </div>
  </main>
</template>
