# frozen_string_literal: true

require 'net/http'

Rails.application.config.after_initialize do
  next if Rails.env.test?
  Thread.new do
    begin
      uri = URI("https://generativelanguage.googleapis.com/v1/models/#{ENV.fetch('GEMINI_LIVE_MODEL')}?key=#{ENV.fetch('GEMINI_API_KEY')}")
      res = Net::HTTP.get_response(uri)
      unless res.is_a?(Net::HTTPSuccess)
        Rails.logger.warn("[BootCheck] GEMINI_LIVE_MODEL #{ENV['GEMINI_LIVE_MODEL']} returned #{res.code} on startup")
      end
    rescue => e
      Rails.logger.warn("[BootCheck] model probe failed: #{e.class} #{e.message}")
    end
  end
end