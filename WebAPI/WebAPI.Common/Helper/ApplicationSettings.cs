using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace WebAPI.Common.Helper
{
    /// <summary>
    ///   ApplicationSettings class handles the items from API - appsettings.json
    /// </summary>
    public class ApplicationSettings
    {
        private ConfigurationBuilder configurationBuilder;
        private IConfigurationRoot root;

        /// <summary>Initializes a new instance of the <see cref="ApplicationSettings" /> class.</summary>
        public ApplicationSettings()
        {
            configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            root = configurationBuilder.Build();
        }

        /// <summary>Get the configuration.</summary>
        /// <param name="section" cref="string">The section.</param>
        /// <param name="key" cref="string">The key.</param>
        /// <param name="obj" cref="object">The object.</param>
        /// <returns cref="object">
        ///   Returns object.
        /// </returns>
        public object GetConfiguration(string section, string key, object obj)
        {
            PropertyInfo propertyInfo = obj.GetType().GetProperty(key);
            var configValue = root.GetSection(section).GetSection(key).Value;
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(obj, configValue, null);
            }
            return obj;
        }

        /// <summary>Get the configuration value.</summary>
        /// <param name="section" cref="string">The section.</param>
        /// <param name="key" cref="string">The key.</param>
        /// <returns cref="string">
        ///   Returns string.
        /// </returns>
        public string GetConfigurationValue(string section, string key)
        {
            return root.GetSection(section).GetSection(key).Value; ;
        }
    }
}
