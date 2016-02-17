$(function() {
    var handleResponse,
        getResponse,
        mWords = $('#hPhrases').magicSuggest({ maxSuggestions: 2, maxSelection: 15 });

    handleResponse = function(res, button) {
        $(button).removeClass('disabled');
        if (res.status == "200") {
            $('#resPanel').addClass('panel-success');
            $('#resPanel').removeClass('panel-danger');
            $('#resPanel .panel-heading').html("RawText - highlighted key words");
            $('#aResults').show();
            $('#analysdText').html(res.mText);
            var kWords = res.kWords || [];
            mWords.clear();
            mWords.setData(kWords);
            mWords.setValue(kWords);
            $('#hPhrases').show();
            $('#hPhrases input[type=text]').focus();
        } else {
            $('#resPanel').removeClass('panel-success');
            $('#resPanel').addClass('panel-danger');
            $('#resPanel .panel-heading').html("Error!!");
            $('#aResults').show();
            $('#analysdText').html("Error..");
        }
    }

    $(document).on("click", "#bAnalyze", function() {
        var text = $('#tRawtextUrl').val();
        if (!text.length) {
            $('#tRawtextUrl').focus();
            $('#aResults').hide();
            $('#hPhrases').hide();
            return;
        }
        getResponse("/result", { tRawtextUrl: text }, this);
        $(this).addClass('disabled');
    });

    getResponse = function(url, data, button) {
        var request = $.ajax({
            url: url,
            method: "POST",
            data: data,
            dataType: 'json'
        });
        $('#aResults').hide();
        $('#hPhrases').hide();
        request.done(function(response) {
            handleResponse(response, button);
        });

        request.fail(function(msg, textStatus) {
            handleResponse(msg, button);
        });
    }
    $(document).on("click", "#bAnalyzeTest", function() {
        getResponse("/result", {}, this);
        $(this).addClass('disabled');
    });
});
