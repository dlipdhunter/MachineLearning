var Utils = {
    randomInt : function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    randomInt2 : function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    },

    randomFloat : function(min, max) {
        return Math.random() * (max - min) + min;
    },

    randomChar : function() {
        var c = this.randomInt2(64,122);
        
        if (c === 64) {
            c = 32;
        }

        return String.fromCharCode(c);
    }
}