<template lang="html">
  <main id="classic">

    <div class="row">
        <div class="col-md-8">
            <div class="">
                <h2 class="sr-only">{{ $t('msg.what.title') }}</h2>
                <p class="text-center"><img :src="screen" alt="" class="ombre" /></p>
                <div class="caption">
                    <p>{{ $t('msg.what.desc') }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4" id="howitworks">
            <h2 class="h3">{{ $t('msg.how.title') }}</h2>
            <ul>
              <li v-html="$t('msg.how.create')"></li>
              <li v-html="$t('msg.how.write')"></li>
              <li v-html="$t('msg.how.invite')"></li>
              <li id="howColor" v-html="$t('msg.how.color')"></li>
              <li v-html="$t('msg.how.chat')"></li>
              <li v-html="$t('msg.how.timeline')"></li>
              <li v-html="$t('msg.how.export')"></li>
            </ul>
            <p v-html="$t('msg.how.demo')"></p>
        </div>
    </div>

    <div class="row">

      <div class="col-md-6 col-md-offset-1 pad-options">
        <div class="well">
          <form class="form-horizontal" id="create-pad">
            <fieldset>
              <legend><i class="fa fa-fw fa-lg fa-globe"></i> {{ $t('msg.public.title') }}</legend>
              <div class="form-group">
                <label for="classic-pad-name" class="col-sm-4 control-label">{{ $t('msg.public.name') }}</label>
                <div class="col-sm-8">
                  <input type="text" id="classic-pad-name" class="form-control pad-name" value="" maxlength="50"  aria-describedby="#name-help"/>
                  <span id="name-help" class="help-block small">
                    <strong>
                      <i class="fa fa-lg fa-warning" aria-hidden="true"></i>
                      {{ $t('msg.public.warning') }}
                    </strong><br>
                    {{ $t('msg.public.samename') }}
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label for="expiration" class="col-sm-4 control-label"></label>
                <div class="col-sm-8">
                  <select id="expiration" aria-describedby="#expiration-help" class="form-control">
                    <option value="quotidien">{{ $t('msg.public.day') }}</option>
                    <option value="hebdo">{{ $t('msg.public.week') }}</option>
                    <option value="mensuel" selected>{{ $t('msg.public.month') }}</option>
                    <option value="bimestriel">{{ $t('msg.public.two-month') }}</option>
                    <option value="semestriel">{{ $t('msg.public.six-month') }}</option>
                    <option value="annuel">{{ $t('msg.public.year') }}</option>
                  </select>
                  <span id="expiration-help" class="help-block small" v-html="$t('msg.public.help')"></span>
                  <span class="annuel jauge help-block small">
                    <i class="fa fa-lg" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b></b> pads
                    <b>annuels</b> {{ $t('msg.public.running') }}<br>
                  </span>
                  <span class="semestriel jauge help-block small">
                    <i class="fa fa-lg" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b></b> pads
                    <b>semestriels</b> {{ $t('msg.public.running') }}
                  </span>
                  <span class="bimestriel jauge help-block small">
                    <i class="fa fa-lg" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b class="textColor"></b> pads
                    <b>bimestriels</b> {{ $t('msg.public.running') }}
                  </span>
                  <span class="mensuel jauge help-block small">
                    <i class="fa fa-lg fa-thermometer-quarter text-success" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b></b> pads
                    <b>mensuels</b> {{ $t('msg.public.running') }}
                  </span>
                  <span class="hebdo jauge help-block small">
                    <i class="fa fa-lg fa-thermometer-quarter text-success" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b></b> pads
                    <b>hebdos</b> {{ $t('msg.public.running') }}
                  </span>
                  <span class="quotidien jauge help-block small">
                    <i class="fa fa-lg fa-thermometer-quarter text-success" aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }} <b></b> pads
                    <b>quotidiens</b> {{ $t('msg.public.running') }}
                  </span>
                </div>
              </div>
              <div class="text-center col-sm-12">
                <button class="btn btn-lg btn-primary pad-create" type="submit">
                  <i class="fa fa-fw fa-lg fa-align-left"></i> {{ $t('msg.public.create') }} »
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
            <legend><i class="fa fa-fw fa-lg fa-key"></i> {{ $t('msg.private.title') }}</legend>
            <p>{{ $t('msg.private.desc') }}</p>
            <p class="text-center">
              <a href="https://mypads.framapad.org/mypads/?/login" class="btn btn-block btn-lg btn-primary"><i class="glyphicon glyphicon-lock"></i> {{ $t('msg.private.signin') }}</a>
              <a href="https://mypads.framapad.org/mypads/?/subscribe" class="btn btn-block btn-lg btn-success"><i class="glyphicon glyphicon-user"></i> {{ $t('msg.private.signup') }}</a>
            </p>
          </fieldset>
        </div>
      </div>

    </div>

    <hr role="presentation" />

    <div class="row">

      <div class="col-md-4" id="tuto-video">
        <h2>{{ $t('msg.help.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-film"></i></p>
        <p>{{ $t('msg.help.desc') }}</p>
        <p class="text-center"><a href="#TutoVideo" data-toggle="modal" class="btn btn-primary">{{ $t('msg.help.play') }}</a></p>
      </div>

      <!-- modale vidéo -->
      <div class="modal fade" id="TutoVideo" tabindex="-1" role="dialog" aria-labelledby="TutoVideoLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">x</span><span class="sr-only">{{ $t('msg.help.close') }}</span></button>
              <h1 id="TutoVideoLabel">{{ $t('msg.help.title') }}</h1>
            </div>
            <div class="modal-body text-center">
              <iframe width="560" height="315" src="https://framatube.org/videos/embed/4ebf637e-83d1-4fd7-b255-2716cfd7447b" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal-footer"><a href="#" class="btn btn-default" data-dismiss="modal">{{ $t('msg.help.close') }}</a></div>
          </div>
        </div>
      </div>
      <!-- /modale vidéo -->

      <div class="col-md-4" id="le-logiciel">
        <h2>{{ $t('msg.software.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-cloud"></i></p>
        <p>{{ $t('msg.software.basedon') }} <a href="http://etherpad.org">Etherpad</a>.</p>
        <p>{{ $t('msg.software.itis') }} <a href="https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite">{{ $t('msg.software.instances') }}</a>.</p>
        <p v-html="$t('msg.software.license')"></p>
      </div>

      <div class="col-md-4" id="jardin">
        <h2>{{ $t('msg.garden.title') }}</h2>
        <p class="text-center" role="presentation"><i class="glyphicon glyphicon-tree-deciduous"></i></p>
        <p>{{ $t('msg.garden.contrib') }} <a href="https://github.com/ether/etherpad-lite">{{ $t('msg.garden.devsite') }}</a>.</p>
        <br>
        <p>{{ $t('msg.garden.install') }}</p>
        <p class="text-center"><a :href="$t('msg.garden.framacloud')" style="color:white" class="btn btn-success"><i class="glyphicon glyphicon-tree-deciduous"></i> framacloud.org</a></p>
      </div>
    </div>
  </main>
</template>

<script src='./home.js'></script>
