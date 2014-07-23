require(['jquery', 'history-js'], function() {

    var steps = function(options) {
        $.extend(true, this.options, options);
        this._init();
    };

    steps.prototype.options = {
        stepBtn: '.js-step',
        subStepBtn : '.js-subStep',
        subStepControls : '.js-subStepControls'
    };

    steps.prototype._init = function() {

        this.$element = $('.main-content');
        this._initSelectors();
        this._delegateEvents();

    };

    steps.prototype._initSelectors = function() {
        this.$subStepsControls = this.$element.find(this.options.subStepControls);
    };

    steps.prototype._delegateEvents = function() {
        this.$element.on('click', this.options.stepBtn, $.proxy(this._onStepClick, this));
        this.$element.on('click', this.options.subStepBtn, $.proxy(this._onSubStepClick, this));
    };

    //#region events
    steps.prototype._onStepClick = function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget),
            href = $target.attr('href');

        var $oldSelectedStep = $(this.options.stepBtn + '.selected');

        $oldSelectedStep.removeClass('selected');
        $target.addClass('selected');

        if ($target.hasClass('js-withSubSteps')) {
            this.$subStepsControls.show();
            var $oldSelectedSubStep = this.$element.find(this.options.subStepBtn + '.selected');

            $oldSelectedSubStep.removeClass('selected');
            this.$element.find(this.options.subStepBtn + ':first').addClass('selected');

        } else {
            this.$subStepsControls.hide();
        }

        history.pushState({}, "Step", href);
    };

    steps.prototype._onSubStepClick = function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget),
            href = $target.attr('href');

        var $oldSelectedSubStep = this.$element.find(this.options.subStepBtn + '.selected');

        $oldSelectedSubStep.removeClass('selected');
        $target.addClass('selected');

        history.pushState({}, "Step", href);
    };
    //#endregion

    $(function() {

        var ctrl = new steps(requireConfig.pageOptions);

    });

});