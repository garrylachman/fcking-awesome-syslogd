//
//  TestApp.swift
//  Shared
//
//  Created by Dr G on 23/05/2021.
//

import SwiftUI

@main
struct TestApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
