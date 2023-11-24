const mongoose = require('mongoose');
var suid = require('rand-token').suid;

const tenantSessionSchema = mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tenants'
    },
    token: {
        type: String,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
        getters: true,
        setters: true
    },
    toObject: {
        getters: true,
        setters: true
    }
});


// Pre-save hook to generate and set the token
tenantSessionSchema.pre('save', function (next) {
    if (!this.token) {
        this.token = this.company_id + suid(99);;
    }
    next();
});

module.exports = new Map([['tenant_sessions', tenantSessionSchema]]);
